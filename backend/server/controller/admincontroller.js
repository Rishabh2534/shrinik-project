import connection from '../config/database.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// Configure Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'events', // The folder name on Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });
const upload = multer({ storage: storage });

//credential interfaces ..
export const Register = async (req, res) => {
    try {
        const { team,post,name,linkedinUrl, username,MobileNo, email, password ,code} = req.body;
        if(code!=2534){
            return res.status(401).json({
                message: "Incorrect Code",
                success: false,
            });
        }
        
        if (!team||!post||!linkedinUrl||!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Check if user already exists
        connection.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                return res.status(500).json({
                    message: "Server error",
                    success: false,
                
                });
            }

            if (results.length > 0) {
                return res.status(401).json({
                    message: "User already exists.",
                    success: false,
                });
            }

            const hashedPassword = await bcryptjs.hash(password, 16);

            // Insert new user into the database
            connection.query('INSERT INTO user (Team,Post,name, username, email,Phone, password,linkedinUrl) VALUES (?,?,?,?,?, ?, ?, ?)', 
                                                            [team,post,name, username, email,MobileNo, hashedPassword,linkedinUrl], (err, results) => {
                if (err) {
                    console.error('Error inserting into the database:', err);
                    return res.status(500).json({
                        message: "Server error", 
                        success: false,
                    });
                }

                return res.status(201).json({
                    message: "Account created successfully",
                    success: true,
                });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required",
                success: false,
            });
        }

        connection.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                return res.status(500).json({
                    message: "Server error",
                    success: false,
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: "No such users",
                    success: false,
                    results:results,
                });
            }

            const user = results[0];
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Incorrect email or password",
                    success: false,
                });
            }

            const tokenData = {
                userId: user.id,
            };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
            return res.status(201).cookie("token", token, { expires: new Date(Date.now() + 86400000), httpOnly: true }).json({
                message: `Welcome back ${user.name}`,
                user,
                success: true,
                isAdmin:true,
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
export const Logout = (req, res) => {
    return res.cookie("token", "", { expires: new Date(Date.now()) }).json({
        message: "User logged out",
        success: true,
    });
};

// interface to get the list of events
export const GetEvents = (req, res) => {
    connection.query('SELECT * FROM events', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
        return;
      }
  
      // Check if no rows are found
      if (results.length === 0) {
        return res.status(404).json({ message: 'No events foundo' });
      }
  
      res.status(200).json(results);
    });
  };
//create event and update in database
export const createPost = async (req, res) => {
    // First, handle the file upload using Multer
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: "File upload failed",
                success: false,
            });
        }

        // Destructure the other fields from req.body after Multer processes the file
        const { title, description, date, venue, applicationLink } = req.body;
        const file = req.file;  // The uploaded file

        // Validate that the required fields are present
        if (!title || !description || !date || !venue || !applicationLink) {
            return res.status(401).json({
                message: "All fields are required",
                success: false,
            });
        }
      /* if(file){
            return res.status(401).json({
                message: file.originalname,
                success:false,
            })
        }*/
        // Now handle the file upload to Firebase (if there is a file)
        
        let imageUrl = null;
        if (file) {
                imageUrl=file.path;
                insertEvent(title, description, date, venue, applicationLink, imageUrl, res);
        
        } else {
            console.log('No file received');
            insertEvent(title, description, date, venue, applicationLink, imageUrl, res);
        }
        
    


    });
};
//inserting function to the database
const insertEvent = (title, description, date, venue, applicationLink, imageUrl, res) => {
    const query = 'INSERT INTO events (title, description, date, venue, applicationLink, imageUrl) VALUES (?, ?, ?, ?, ?, ?)';
     connection.query(query, [title, description, date, venue, applicationLink, imageUrl], (err, results) => {
        if (err) {
            console.error('Error inserting into the database:', err);
            return res.status(500).json({
                message: "Server error",
                success: false,
            });
        }

        return res.status(201).json({
            message: "Event created successfully",
            success: true,
        });
    });
};
//deleting the event interface
export const deleteEvent = (req, res) => {
    const { id } = req.params;

    // Get the event details including image URL
    connection.query('SELECT * FROM events WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: "Server error", success: false });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        const event = results[0];
        const imageUrl = event.imageUrl;

        // Delete the event from the database
        connection.query('DELETE FROM events WHERE id = ?', [id], async (err, results) => {
            if (err) {
                console.error('Error deleting from the database:', err);
                return res.status(500).json({ message: "Server error", success: false });
            }

            // If an image URL exists, delete the image from Cloudinary
            if (imageUrl) {
                const publicId = imageUrl.split('/').pop().split('.')[0];
                try {
                    await cloudinary.uploader.destroy(`events/${publicId}`);
                } catch (error) {
                    console.error('Error deleting image from Cloudinary:', error);
                }
            }

            return res.status(200).json({ message: "Event deleted successfully", success: true });
        });
    });
};
// Function to update an event
export const updateEvent = async (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: "File upload failed",
                success: false,
            });
        }
    const { id } = req.params;
    const { title, description, date, venue, applicationLink } = req.body;
    const file = req.file;

    // Get the existing event details
    connection.query('SELECT * FROM events WHERE id = ?', [id], async (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: "Server error", success: false });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        const event = results[0];
        let imageUrl = event.imageUrl;

        // If a new file is uploaded, handle the image replacement
        if (file) {
            // Delete the old image from Cloudinary if it exists
            if (imageUrl) {
                const publicId = imageUrl.split('/').pop().split('.')[0];
                try {
                    await cloudinary.uploader.destroy(`events/${publicId}`);
                } catch (error) {
                    console.error('Error deleting image from Cloudinary:', error);
                }
            }
            // Update the image URL to the new one
            imageUrl = file.path;
        }

        // Update the event details in the database
        const query = 'UPDATE events SET title = ?, description = ?, date = ?, venue = ?, applicationLink = ?, imageUrl = ? WHERE id = ?';
        connection.query(query, [title, description, date, venue, applicationLink, imageUrl, id], (err, results) => {
            if (err) {
                console.error('Error updating the database:', err);
                return res.status(500).json({ message: "Server error", success: false });
            }

            return res.status(200).json({ message: "Event updated successfully", success: true });
        });
    });
});
};
//interface to get all the pictures url for gallary from the database table gallary
export const getGallary = async (req,res) =>{
    try{
        connection.query('SELECT * FROM gallary ',(err,results)=>{
            if(err){
                console.log('error Querring database',err);
            }
            if(results.length==0){
                return res.status(404).json({
                   message: "gallary not found0",
                   success:false
                });
            }

            return res.status(200).json(results);
        });

    }
    catch(err){
        console.log(err);
    }
}
//for uploadinng the gallary pictures
export const gallary = async (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: 'Picture upload failed',
                success: false
            });
        }

        const { ImageFor } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: 'No file uploaded',
                success: false
            });
        }

        const imageUrl = file.path;
        const query = 'INSERT INTO gallary (ImageFor, imageUrl) VALUES (?, ?)';

        connection.query(query, [ImageFor, imageUrl], (err) => {
            if (err) {
                console.log("Error inserting picture to database:", err);
                return res.status(500).json({
                    message: 'Server error',
                    success: false
                });
            } else {
                return res.status(200).json({
                    message: 'Picture added successfully',
                    success: true
                });
            }
        });
    });
};
export const editPicture= async(req,res)=>{
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: "File upload failed",
                success: false,
            });
        }
    const { id } = req.params;
    const { ImageFor} = req.body;
    const file = req.file;

    // Get the existing event details
    connection.query('SELECT * FROM gallary WHERE id = ?', [id], async (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: "Server error", success: false });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        const event = results[0];
        let imageUrl = event.imageUrl;

        // If a new file is uploaded, handle the image replacement
        if (file) {
            // Delete the old image from Cloudinary if it exists
            if (imageUrl) {
                const publicId = imageUrl.split('/').pop().split('.')[0];
                try {
                    await cloudinary.uploader.destroy(`events/${publicId}`);
                } catch (error) {
                    console.error('Error deleting image from Cloudinary:', error);
                }
            }
            // Update the image URL to the new one
            imageUrl = file.path;
        }

        // Update the event details in the database
        const query = 'UPDATE gallary SET ImageFor=?, imageUrl = ? WHERE id = ?';
        connection.query(query, [ImageFor, imageUrl, id], (err, results) => {
            if (err) {
                console.error('Error updating the database:', err);
                return res.status(500).json({ message: "Server error", success: false });
            }

            return res.status(200).json({ message: "Event updated successfully", success: true });
        });
    });
});
}
export const getMember=async(req,res)=>{
    const {team}=req.params;
    try{
        connection.query('SELECT * FROM members',(err,result)=>{
            if(err){
                console.log('error Querring database',err);
            }
            if(result.length==0){
                return res.status(404).json({
                   message: "members not found0",
                   success:false
                });
            }
           const filtered=result.filter((member)=>member.team===team);
            return res.status(200).json(filtered);
        });
    }
    catch(err){
        console.log("server error",err);
    }
};
export const getDirector=async(req,res)=>{
    
    const {team}=req.params;
    console.log("fetching director ",team);
      try{
            connection.query("SELECT * FROM user WHERE (Post='Director' OR Post='Codirector') AND Team=?",[team],(err,result)=>{
                     if(err){
                        console.log("error querying database ",err);
                     }
                    
                     if(result.length===0){
                        return res.status(200).json({
                           message: "directors not foundo",
                           success:false,
                        });
                    }
                    
                    return res.status(200).json(result);
            });
      }catch(err){
        console.log("error occured",err);
      }
};


export const AllMember= async(req,res)=>{
    try{
        connection.query('SELECT * FROM members',(err,result)=>{
            if(err){
                console.log('error Querring database',err);
            }
            if(result.length==0){
                return res.status(404).json({
                   message: "members not found0",
                   success:false
                });
            }
          
            return res.status(200).json(result);
        });
    }
    catch(err){
        console.log("server error",err);
    }
}
export const AllAdmin= async(req,res)=>{
    try{
        connection.query("SELECT * FROM user ",(err,result)=>{
                 if(err){
                    console.log("error querying database ",err);
                 }
                
                 if(result.length===0){
                    return res.status(200).json({
                       message: "directors not foundo",
                       success:false,
                    });
                }
                
                return res.status(200).json(result);
        });
  }catch(err){
    console.log("error occured",err);
  }
}
export const DeleteMember=async(req,res)=>{
    const { id } = req.params;

    // Get the event details including image URL
    connection.query('SELECT * FROM members WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: "Server error", success: false });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        const event = results[0];
        

        // Delete the event from the database
        connection.query('DELETE FROM members WHERE id = ?', [id], async (err, results) => {
            if (err) {
                console.error('Error deleting from the database:', err);
                return res.status(500).json({ message: "Server error", success: false });
            }

            // If an image URL exists, delete the image from Cloudinary
           

            return res.status(200).json({ message: "member deleted successfully", success: true });
        });
    });
}
export const DeleteAdmin =async(req,res)=>{
    const { id } = req.params;

    // Get the event details including image URL
    connection.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: "Server error", success: false });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        const event = results[0];
        

        // Delete the event from the database
        connection.query('DELETE FROM user WHERE id = ?', [id], async (err, results) => {
            if (err) {
                console.error('Error deleting from the database:', err);
                return res.status(500).json({ message: "Server error", success: false });
            }

            // If an image URL exists, delete the image from Cloudinary
           

            return res.status(200).json({ message: "member deleted successfully", success: true });
        });
    });
}
export const AddMember=async(req,res)=>{
    upload.none()(req, res, (err) => {
        if(err){
            conasole.log(err);
            return res.status(500).json({
                message:"errrrrrr"
            })
        }
    const{memberName,team,linkedinUrl}=req.body;
    console.log(req.body);
    console.log("name",team);
    const query = 'INSERT INTO members(name,team,linkedinUrl) VALUES (?, ?, ?)';
    connection.query(query, [memberName,team,linkedinUrl], (err, results) => {
       if (err) {
           console.error('Error inserting into the database:', err);
           return res.status(500).json({
               message: "Server error",
               success: false,
           });
       }

       return res.status(201).json({
           message: "Event created successfully",
           success: true,
       });
   });
});
}
