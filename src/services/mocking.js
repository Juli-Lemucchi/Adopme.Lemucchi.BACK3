import { faker } from '@faker-js/faker';
import {createHash} from '../utils/index.js'

class MockingService {
     
    static async generateMockingUsers(num){
        const users=[];
        for(let i= 0; i < num; i++){
            users.push({
                fistName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash("adopClave"),
                role: faker.helpers.arrayElement(["user","admin"]),
                pets: []
            })
        }
        return users;

    }

    static async generateMockingPets(num){
        const pets=[];
        
        for(let i= 0; i < num; i++){
            pets.push({
                name:faker.animal.dog(),
                specie: faker.animal.type(),
                adopted:false,
                birthday: faker.date.past(),
                image:faker.image.dog()
            })
    }
    return pets;

}
}

export default MockingService