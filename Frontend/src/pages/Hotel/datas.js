
const images = [
    {
        id: '1',
        src: 'photo/hotel-Gardens-The-10-Most-Beautiful-Around-the-World-1.jpg',
        type: "1"
    },
    {
        id: '2',
        src: 'photo/1584332881-143-thumbnail_schema_article.jpg',
        type: "1"
    },
    {
        id: '3',
        src: 'photo/b11a2b3b7db771727f524e7d67f1e1e7.png',
        type: "1"
    },
    {
        id: '4',
        src: 'photo/ho-boi-spa.png',
        type: "2"
    },
    {
        id: '5',
        src: 'photo/intercontinental-danang-city-3986758374-2x1-1657599743.jpg',
        type: "2"
    },
    {
        id: '6',
        src: 'photo/hotel-Gardens-The-10-Most-Beautiful-Around-the-World-1.jpg',
        type: "2"
    }
];

const room = {
    isAllowPet: false,
    limitNumberOfCustomers: 6,
    roomType: [
        {
            name: 'Phòng loại 1',
            price: 20
        },
        {
            name: 'Phòng loại 2',
            price: 24
        },
        {
            name: 'Phòng loại 3',
            price: 28
        }
    ]
}

export {
    images,
    room
}
