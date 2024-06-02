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
    // const { originalUrl, targetValues } = req.body; // פירוק נתוני גוף הבקשה
    try {
      const user = await user.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }      
      try {
        // const newLink = await LinkModel.create(req.body.originalUrl);//הוספת חדש
        const newLink = await LinkModel.create( req.body ); // יצירת קישור חדש
        res.json(`http://localhost:3000/l/${newLink._id}`);
        user.links.push(newLink); // הוסף את הקישור החדש לרשימת המשתמש
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

      // Extract the target parameter value from the query string
      const targetParamValue = req.query[link.targetParamName] || '';

      // Add the click with the target parameter value
      link.clicks.push({
        insertedAt: new Date(),
        ipAddress: req.ip,
        targetParamValue: targetParamValue,
      });
      
      await link.save();
      
      res.redirect(302, link.originalUrl);
    } catch (e) {
      res.status(500).send('Server error');
    }
  },
  getClicksByTarget: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
  
      if (!link) {
        return res.status(404).send('Link not found');
      }
  
      const clicksByTarget = link.clicks.reduce((acc, click) => {
        const target = click.targetParamValue || 'unknown';
        if (!acc[target]) {
          acc[target] = 0;
        }
        acc[target]++;
        return acc;
      }, {});
  
      res.json(clicksByTarget);
    } catch (e) {
      res.status(500).send('Server error');
    }
  },  
};

export default LinksController;