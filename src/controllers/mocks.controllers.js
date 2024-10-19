import MockingService from "../services/MockingService.js";

const getMockingPets = (req,res)=>{
    const pets = MockingService.getMockingPets(100);
    
}
