import express from 'express';
import Task from '../models/task';
import verifyToken from '../middleware/auth';

const router = express.Router();

// Get api/tasks
// get task
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).populate('user', ['password']);
    res.json({ success: true, tasks });
  } catch (error) {
    console.info(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Post api/task
// create task
// eslint-disable-next-line consistent-return
router.post('/', verifyToken, async (req, res) => {
  const { title, status } = req.body;

  // simple validate
  if (!title) return res.status(400).json({ success: false, message: 'Task is require' });

  try {
    const newTask = new Task({
      title,
      status,
      user: req.userId,
    });

    await newTask.save();

    res.json({ success: true, message: 'Success', task: newTask });
  } catch (error) {
    console.info(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT api/task
// update task

// eslint-disable-next-line consistent-return
router.put('/:id', verifyToken, async (req, res) => {
  const { title, status } = req.body;

  // simple validate
  if (!title) return res.status(400).json({ success: false, message: 'Task is require' });

  try {
    let updatedTask = {
      title,
      status,
    };

    const taskUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedTask = await Task.findOneAndUpdate(taskUpdateCondition, updatedTask, { new: true });

    // user not authorised to update task or task not found

    if (!updatedTask)
      return res.status(401).json({
        success: false,
        message: 'Task not found or user not authorised',
      });
    // update success
    res.json({ success: true, message: 'good', task: updatedTask });
  } catch (error) {
    console.info(error);
    res.status(500).json({ success: false, mesage: 'Internal server error' });
  }
});

// Delete api/task
// delete task
// eslint-disable-next-line consistent-return
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const taskDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedTask = await Task.findOneAndDelete(taskDeleteCondition);
    // user not authoriseed or task not found
    if (!deletedTask)
      return res.status(401).json({
        success: false,
        message: 'Task not found or user not authorised',
      });
    // delete success
    res.json({ success: true, task: deletedTask });
  } catch (error) {
    console.info(error);
    res.status(500).json({ success: false, mesage: 'Internal server error' });
  }
});
module.exports = router;
