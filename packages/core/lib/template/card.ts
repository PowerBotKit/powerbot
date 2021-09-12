// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import * as ACData from 'adaptivecards-templating';
import { Activity, Attachment, CardFactory, MessageFactory } from 'botbuilder';

export function buildCard(card: any, params?: any): Partial<Activity> {
	if (params) {
		return doBuildTemplateCard(card, params);
	} else {
		return doBuildCard(card);
	}
}

function doBuildTemplateCard(card: any, params: any): Partial<Activity> {
	const template = new ACData.Template(card);
	const ctx: ACData.IEvaluationContext = {
		$root: {
			...params
		}
	};
	const content = template.expand(ctx);
	const c: Attachment = CardFactory.adaptiveCard(content);
	const message = MessageFactory.attachment(c);

	return message;
}

function doBuildCard(card: any): Partial<Activity> {
	const c: Attachment = CardFactory.adaptiveCard(card);
	const message = MessageFactory.attachment(c);

	return message;
}
