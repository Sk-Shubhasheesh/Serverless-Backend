/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {

}

// when we write to express code then we worry about method & route - app.get("/user") & body, headers, query parameters..


export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		return Response.json({
			message: "you did not sent a get request"
		});
	}
}
