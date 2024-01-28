const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Connection Open");
  })
  .catch((e) => {
    console.log("Error", e);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime animi vero accusamus enim dolore aut, libero omnis magni dolorem consectetur assumenda eos odio? Temporibus, sequi error quis commodi dolores iste. Et tempore sunt reprehenderit voluptatem nobis quibusdam dolore vitae odit nostrum at consectetur possimus velit ullam eveniet perferendis, inventore minima suscipit dolor officiis voluptates, soluta autem ea molestiae. Dolores, nobis?",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
