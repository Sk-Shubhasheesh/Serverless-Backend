## What are backends servers?
* You might’ve used express to create a Backend server.
* The way to run it usually is node index.js which starts a process on a certain port (3000 for example)
* When you have to deploy it on the internet, there are a few ways - 
1. Go to aws, GCP, Azure, Cloudflare
   1. Rent a VM (Virtual Machine) and deploy your app
   2. Put it in an Auto scaling group
   3. Deploy it in a Kubernetes cluster
 
* There are a few downsides to doing this - 
1. Taking care of how/when to scale 
2. Base cost even if no one is visiting your website
3. Monitoring various servers to make sure no server is down
 
#### What if, you could just write the code and someone else could take care of all of these problems?

* "Serverless" is a backend deployment in which the cloud provider dynamically manages the allocation and provisioning of servers. The term "serverless" doesn't mean there are no servers involved. Instead, it means that developers and operators do not have to worry about the servers.

### Easier defination
* What if you could just write your express routes and run a command. The app would automatically 
1. Deploy
2. Autoscale
3. Charge you on a per request basis (rather than you paying for VMs)

#### Problems with this approach
1. More expensive at scale
2. Cold start problem

#### Famous serverless providers
* There are many famous backend serverless providers - <br>
🔴 AWS Lambda </br>
🔴 Google Cloud Functions<br>
🔴 Cloudflare Workers

#### When should you use a serverless architecture?

1. When you have to get off the ground fast and don’t want to worry about deployments
2. When you can’t anticipate the traffic and don’t want to worry about autoscaling
3. If you have very low traffic and want to optimise for costs


### Initializing a worker in Cloudflare Workers
* To create and deploy your application, you can take the following steps - 
### Initialize a worker
npm create cloudflare -- my-app

### Explore package.json dependencies
"wrangler": "^3.0.0"

### Start the worker locally
npm run dev

### How to return json?
```.js
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return Response.json({
			message: "hi"
		});
	},
};
```

## Question - Where is the express code? HTTP Server?
* Cloudflare expects you to just write the logic to handle a request. 
Creating an HTTP server on top is handled by cloudflare

### Question - How can I do routing ? 
* In express, routing is done as follows -
```.js
import express from "express"
const app = express();

app.get("/route", (req, res) => {
	// handles a get request to /route
});
```
* How can you do the same in the Cloudflare environment?
```.js
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log(request.body);
		console.log(request.headers);
		
		if (request.method === "GET") {
			return Response.json({
				message: "you sent a get request"
			});
		} else {
			return Response.json({
				message: "you did not send a get request"
			});
		}
	},
};
```
* Cloudflare does not expect a routing library/http server out of the box. You can write a full application with just the constructs available above.
* We will eventually see how you can use other HTTP frameworks (like express) in cloudflare workers.