const botURL = process.env.SERVER_URL;

export async function sendDataToBot(data: any) {
    try {
        const res = await fetch(`http://localhost:8000`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return res;
    } catch (e) {
        console.error(e);
    }
}
