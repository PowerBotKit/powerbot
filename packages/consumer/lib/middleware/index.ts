import { GDUserSession } from "@powerbotkit/core";

export interface InputMiddleware {
	process( dialog: GDUserSession): Promise<void>;
}

export interface OutputMiddleware {
	process( dialog: GDUserSession): Promise<void>;
}
