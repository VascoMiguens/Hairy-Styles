const sequelize = require("../config/connection");
const {
  User,
  Post,
  Comment,
  Hairdresser,
  HairStyle,
  StyleTag,
} = require("../models");

const seedUsers = require("./user-seeds.json");
const seedComments = require("./comments-seeds.json");
const seedHairdressers = require("./hairdresser-seeds.json");
const seedHairstyle = require("./hairstyle-seeds.json");
const seedPosts = require("./posts-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // create users through the seeds and use hooks to encript passowrd
  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  const hairdressers = await Hairdresser.bulkCreate(seedHairdressers, {
    returning: true,
  });

  const hairStyles = await HairStyle.bulkCreate(seedHairstyle, {
    returning: true,
  });

  const styletag = [];
  const posts = [];
  //randomize allocation of posts
  for (const post of seedPosts) {
    const newPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      hairdresser_id:
        hairdressers[Math.floor(Math.random() * hairdressers.length)].id,
      hairstyle_id:
        hairStyles[Math.floor(Math.random() * hairStyles.length)].id,
    });
    for (let i = 0; i < seedPosts.length; i++) {
      const newstyletag = await StyleTag.create({
        hairdresser_id: newPost.hairdresser_id,
        hairstyle_id: newPost.hairstyle_id,
      });
      styletag.push(newstyletag);
    }

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
