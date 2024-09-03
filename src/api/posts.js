import axios from "axios";

export default axios.create({
    /* baseURL: 'http://localhost:3000' */
    baseURL: 'https://github.com/tomcat170701/deploy-blog/blob/main/src/data/db.json'
});