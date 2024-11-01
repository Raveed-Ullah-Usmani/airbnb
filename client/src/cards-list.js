const list2 = [
  {
    id: 1,
    rating: "4",
    desc: "Discription",
    imgSrc: [
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
    ],
    price: "xxxx",
    date: "Month DD-DD",
    title: "Property",
  },
  {
    id: 2,
    rating: "4",
    desc: "Discription",
    imgSrc: [
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
    ],
    price: "xxxx",
    date: "Month DD-DD",
    title: "Property",
  },
  {
    id: 3,
    rating: "4",
    desc: "Discription",
    imgSrc: [
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
    ],
    price: "xxxx",
    date: "Month DD-DD",
    title: "Property",
  },
  {
    id: 4,
    rating: "4",
    desc: "Discription",
    imgSrc: [
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
    ],
    price: "xxxx",
    date: "Month DD-DD",
    title: "Property",
  },
];

const list = [
  ...Array(14)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      rating: "4",
      desc: "Discription",
      imgSrc: [
        "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
        "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
        "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      ],
      price: "xxxx",
      date: "Month DD-DD",
      title: "Property",
    })),
];

export { list2, list };