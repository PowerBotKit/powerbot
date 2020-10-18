/* tslint:disable:max-classes-per-file */
import { InputMiddleware, OutputMiddleware } from '@powerbotkit/consumer';
import { GDUserSession } from '@powerbotkit/core';

export class InputMiddlewareGlobal implements InputMiddleware {
	async process(context: GDUserSession) {
		context.input.value =
			context.input.value + '<inject by global input middleware>';
	}
}

export class OutputMiddlewareGlobal implements OutputMiddleware {
	async process(context: GDUserSession) {
		context.output.value =
			context.output.value + '<inject by global output middleware>';
	}
}
export class InputMiddleware4Worker implements InputMiddleware {
	async process(context: GDUserSession) {
		context.input.value = context.input.value + '<inject by input middleware>';
	}
}

export class OutputMiddleware4Worker implements OutputMiddleware {
	async process(context: GDUserSession) {
		context.output.value =
			context.output.value + '<inject by output middleware>';
	}
}
