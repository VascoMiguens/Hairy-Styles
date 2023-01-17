const sequelize = require("../config/connection");
const { User, Post, Comment, Hairdresser, HairStyle } = require("../models");

const seedUsers = require("./user-seeds.json");
const seedComments = require("./comment-seeds.json");
const seedHairdressers = require("./hairdresser-seeds.json");
const seedHairstyle = require("./hairstyle-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //create users through the seeds and use hooks to encript passowrd
  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  const hairdressers = await Hairdresser.bulkCreate(seedHairdressers, {
    returning: true,
  });

  const hairstyles = await HairStyle.bulkCreate(seedHairstyle, {
    returning: true,
  });

  const posts = [];
  //randomize allocation of posts
  for (const post of seedPosts) {
    const newPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      hairdresser_id: hairdressers.floor(Math.random() * hairdressers.length)
        .id,
      hairstyles_id: hairstyles.floor(Math.random() * hairstyles.length).id,
    });
    posts.push(newPost);
  }

  //randomize allocation of comments
  for (const comment of seedComments) {
    await Comment.create({
      ...comment,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit[0];
};

seedDatabase();
