/**
|----------------------------------
| User Api Route
|----------------------------------
*/

const express = require("express");
const router = express.Router();
const UserController = require('../controller/UserController');

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - User
 *     name: Register user
 *     summary: Register user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             username:
 *               type: string
 *             date_of_birth:
 *               type: string
 *         required:
 *           - first_name
 *           - last_name
 *           - username
 *           - date_of_birth
 *     responses:
 *       '201':
 *         description: User registration successful Object
 *       '403':
 *         description: No auth token
 *       '500':
 *         description: Internl server error
 */
// register user 
router.post('/user', UserController.registerUser);

/**
* @swagger
* /api/users:
*   get:
*     tags:
*       - User
*     name: Fetch all users
*     summary: Fetch all users
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: fetch all users
*       500:
*         description: Internal server error
*/
// get users
router.get('/users', UserController.getUsers);

/**
* @swagger
* /api/{username}:
*   delete:
*     tags:
*       - User
*     name: Delet user account
*     summary: Delet user account
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: integer
*         required:
*           - username
*     responses:
*       200:
*         description: Account deleted successfully
*       500:
*         description: Internal server error
*/
// delete user
router.delete('/:username', UserController.deleteUser);
module.exports =  router;