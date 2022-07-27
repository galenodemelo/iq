import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (req.method !== "POST") {
            res.status(405).json({success: false, errorList: ["Method not allowed"]})
            return
        }

    } catch (error) {
        console.error(`api/contact >> ${JSON.stringify(req.body)}`, error)
        res.status(500).json({success: false, errorList: ["Internal server error"]})
    }
}
