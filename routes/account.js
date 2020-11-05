const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const router = express.Router();
const createPlantController = require("../controllers/create-plant");
const accountController = require("../controllers/account");
const deletePlantController = require("../controllers/delete-plant");
const getEditPlantPageController = require("../controllers/getEditPlantPage");

const updatePlantController = require("../controllers/update-plant");
// const { Model } = require("sequelize/types");

// const updatePlantController = require("../controllers/update-plant")
const { v1: uuidv1 } = require("uuid");
const formidable = require("formidable");
const models = require("../models");
const updatePlant = require("../controllers/update-plant");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");
module.exports = router;

//see profile page that displays all posts
router.get("/", accountController);

router.get("/create", (req, res) => {
  res.render("create-plant", {photoClass: "preview-image-hidden", defaultClass: "default-photo-shown",
  defaultDivClass: "preview-image-cropper-shown", photoDivClass: "preview-image-cropper-hidden"});
});

router.post("/create/upload", (req, res) => {
  uploadFile(req, (photoURL) => {
    photoURL = `/uploads/${photoURL}`;
    console.log(photoURL);
    req.session.photoURL = photoURL;
    res.render("create-plant", {Photo: photoURL, photoClass: "preview-image-shown", defaultClass: "default-photo-hidden",
    photoDivClass: "preview-image-cropper-shown", defaultDivClass: "preview-image-cropper-hidden"});
  });
});

router.post("/update/upload", (req, res) => {
  let plant_id = req.session.updatePlantId;

  uploadFile(req, (photoURL) => {
    photoURL = `/uploads/${photoURL}`;
    models.Plants.update(
      {
        imageURL: photoURL,
      },
      {
        where: {
          id: plant_id,
        },
      }
    ).then((updatePlant) => {
      req.session.updatePlantId = "";
      res.redirect(`/account/edit/${plant_id}`);
    });
  });
});


//creating a plant to the plant table
router.post("/create-plant", createPlantController);

//delete route
router.post("/delete-plant", deletePlantController);

//update plant
router.get("/edit/:id", getEditPlantPageController);

router.post("/update-plant", updatePlantController);

router.post("/delete-post", (req, res) => {
  const post_id = req.body.post_id;
  plant_id = req.session.plant_id;

  models.Posts.destroy({
    where: {
      id: post_id,
    },
  }).then((deletedPost) => {
    res.redirect(`/account/details-plant/${plant_id}`);
  });
});

router.post("/create/post/upload", (req, res) => {
  const plant_id = req.session.plant_id;

  uploadFile(req, (postPhotoURL) => {
    postPhotoURL = `/uploads/${postPhotoURL}`;
    req.session.postPhotoURL = postPhotoURL;

    models.Plants.findByPk(plant_id).then((plant) => {
      res.render("add-post", {Plant: plant, photoURL: postPhotoURL, 
        photoClass: "preview-image-shown", defaultClass: "default-photo-hidden", 
        photoDivClass: "preview-image-cropper-shown", defaultDivClass: "preview-image-cropper-hidden"});
    });
  });
});

//Posting Comment
router.post("/add-post", (req, res) => {
  const common_name = req.body.common_name;
  const scientific_name = req.body.scientific_name;
  const body = req.body.body;
  const plant_id = req.body.plant_id;
  const user_id = req.session.userId;
  let postPhotoURL = "";

  if (req.session.postPhotoURL == "" || req.session.postPhotoURL == null) {
      postPhotoURL = "/images/plantrLogo.jpg";
  } else {
      postPhotoURL = req.session.postPhotoURL;
  }

  let posting = models.Posts.build({
    common_name: common_name,
    scientific_name: scientific_name,
    body: body,
    plant_id: plant_id,
    imageURL: postPhotoURL,
    user_id: user_id,
  });

  posting.save().then((savedPosting) => {
    req.session.postPhotoURL = "";
    res.redirect(`/account/details-plant/${plant_id}`);
  });
});

router.get("/details-plant/:id", (req, res) => {
  const plant_id = req.params.id;
  req.session.plant_id = plant_id;

  models.Plants.findByPk(plant_id, {
    include: [
      {
        model: models.Posts,
      },
    ],
  }).then((plant) => {
    res.render("details", { Plant: plant });
  });
});

function uploadFile(req, callback) {
  new formidable.IncomingForm()
    .parse(req)
    .on("fileBegin", (name, file) => {
      uniqueFilename = `${uuidv1()}.${file.name.split(".").pop()}`;
      file.name = uniqueFilename;
      file.path = __basedir + "/uploads/" + file.name;
    })
    .on("file", (name, file) => {
      callback(file.name);
    });
}

router.get("/add-post/:id", (req, res) => {
  const plant_id = req.params.id;
  req.session.plant_id = plant_id;

  models.Plants.findByPk(plant_id).then((plant) => {
    res.render("add-post", {Plant: plant, photoClass: "preview-image-hidden", defaultClass: "default-photo-shown",
    defaultDivClass: "preview-image-cropper-shown", photoDivClass: "preview-image-cropper-hidden"});
  });
});

router.get("/edit-post/:id", (req, res) => {
  const post_id = req.params.id;
  req.session.post_id = post_id;

  models.Posts.findByPk(post_id).then((post) => {
    res.render("edit-post", { Post: post });
  });
});

router.post("/edit-post", (req, res) => {
  const common_name = req.body.common_name;
  const scientific_name = req.body.scientific_name;
  const body = req.body.body;
  const post_id = req.body.post_id;

  let posting = models.Posts.update(
    {
      common_name: common_name,
      scientific_name: scientific_name,
      body: body,
    },
    {
      where: {
        id: post_id,
      },
    }
  ).then((savedPosting) => {
    res.redirect(`/account/edit-post/${post_id}`);
  });
});

router.post("/update/post/upload", (req, res) => {
  let post_id = req.session.post_id;

  uploadFile(req, (photoURL) => {
    photoURL = `/uploads/${photoURL}`;
    models.Posts.update(
      {
        imageURL: photoURL,
      },
      {
        where: {
          id: post_id,
        },
      }
    ).then((updatePlant) => {
      req.session.updatePlantId = "";
      models.Posts.findByPk(post_id).then((post) => {
        res.render("edit-post", { Post: post });
      });
    });
  });
});

//post details routes
router.get("/post-details/:id", async (req, res) => {
  const post_id = req.params.id;

  let post = await models.Posts.findByPk(post_id, {
    include: [
      {
        model: models.Comments,
        include: {
          model: models.Users,
          attributes: ["username", "id"],
        },
      },
      {
        model: models.Users,
        attributes: ["username", "id"],
      },
    ],
  });

  //displaying count of likes
  let likes = await models.Likes.count({
    where: {
      post_id
    }
  })
  console.log(likes)
  console.log(post);
  res.render("post-details", { post: post, likes: likes});
});

router.post("/add-comment/:id", async (req, res) => {
  const post_id = req.params.id;
  const body = req.body.body;
  const user_id = req.session.userId;

  let comment = await models.Comments.build({
    body: body,
    post_id: post_id,
    user_id: user_id,
  });

  let savedComment = await comment.save();

  if (savedComment) {
    res.redirect(`/account/post-details/${post_id}`);
  }
});

//deleting comments
router.post("/post/:post_id/comment/:id/delete-comment", (req, res) => {
  const post_id = req.params.post_id;
  const comment_id = req.params.id;

  models.Comments.destroy({
    where: {
      id: comment_id,
    },
  }).then(() => {
    res.redirect(`/account/post-details/${post_id}`);
  });
});


// router.get('/likes', (req, res) => {
//   res.render("test")
// })

//route to get likes
router.post('/post/:post_id/like', async(req, res) => {
  const post_id = req.params.post_id;
  const user_id = req.session.userId;

  console.log(post_id)
  console.log(user_id)

  let like = await models.Likes.findOne({
    where: {
      post_id: post_id,
      user_id: user_id
    }
  })
  if (like === null) {
    await models.Likes.create({
      post_id,
      user_id
    });

  

  } else {
      //where i destroy the like because it already exists if not null
      await models.Likes.destroy({
        where: {
          post_id: post_id,
          user_id: user_id
        }
      })
      
  }

  res.redirect(`/account/post-details/${post_id}`);
})
