import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [    
    index("./routes/name.tsx"),
    route("/password/:name","./routes/password.tsx"),
    route("/main/:name","./routes/main.tsx"),
] satisfies RouteConfig ;
