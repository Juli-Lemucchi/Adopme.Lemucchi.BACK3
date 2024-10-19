import MockingService from "../services/MockingService.js";

const getMockingPets = async (req,res)=>{
    const pets = await MockingService.getMockingPets(100);
    res.send({status:"success",payload:pets})
}

const getMockingUsers = async (req,res) => {
    const users =await MockingService.getMockingUsers(50);
    res.send({status:"success",payload:users})
}

const generateData = async (req,res) => {
    const {users, pets} = req.body;
    try {

        const mockingUsers = await MockingService.generateUsers(users);
        const mockingPets = await MockingService.generatePets(pets);
        
        await Promise.all(mockingUsers.map(user => usersService.create(user)));
        await Promise.all(mockingPets.map(pet => petsService.create(pet)));

        res.send({
            status:"success",
            message:"Todo salio veryGood"
        })
        
    } catch (error) {
      console.log(error);
      res.status(500).send({status:"error", error:error.message})  
    }    
}
 export default{getMockingPets, getMockingUsers, generateData}