import clientPromise from "@/utils/dbConnect";
import User from "@/models/User"

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Cars");
    switch(req.method){
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let Users = await db.collection("Users").insertOne(bodyObject);
            res.json(Users.ops[0]);
            break;
        case "GET":
            const allUsers = await db.collection("Users").find({}).toArray();
            res.json({status: 200, data: allUsers});
            break;
    }
}
