import { faker } from '@faker-js/faker';

class MockingService {
    

    async generateMockingPets(){
        const pets=[];
        
        for(let i= 0; i < 10; i++){
            pets.push({
                name:faker.animal.dog(),
            })
    }

}
}