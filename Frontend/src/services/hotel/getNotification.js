
const getType = (type) => {
    switch(type) {
        case 1: return "all";
        case 2: return "latest";
        default: throw new Error("Invalid Notification Type");
    }
}


export default async function getNotification(userId, type, sourceId = null) {
    const url = `http://localhost:8080/bookify/api/user/notification/?userId=${userId}&type=${getType(type)}&sourceId=${sourceId}`
    const data = await fetch(url).then(res => res.json()).then(data => data);
    return data; 
}