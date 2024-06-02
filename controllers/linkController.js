import LinkModel from '../models/linkModel.js';
const LinksController = {
  getList: async (req, res) => {
    try {
      const links = await LinkModel.find();
      res.json(links);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const link = await LinkModel.findById(req.params.id);//שליפה לפי מזהה
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    const userId = req.params.userId;
    // const targetValues = req.body.targetValues;
  
    try {
      const user = await user.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }      
      try {
        const newLink = await LinkModel.create(req.body.originalUrl);//הוספת חדש
        res.json(`http://localhost:3000/l/${newLink._id}`);
        user.links.push(link);
        await user.save();
    
        res.status(201).send({
          message: 'Link created successfully',
          link: link,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },  
  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });//עדכון לפי מזהה
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await LinkModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  redirect: async (req, res) => {
    try {
      const link = await LinkModel.findById(req.params.id);

      if (!link) {
        return res.status(404).send('Link not found');
      }

      if (link) {
        link.clicks.push({
          insertedAt: new Date(),
          ipAddress: req.ip,
        });
    
        await link.save();

        res.redirect(302, link.originalUrl);
      } else {
        res.status(404).send('Link not found');
      }
    } catch (e) {
      res.status(500).send('Server error');
    }
  }
};

export default LinksController;