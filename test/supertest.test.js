import supertest from "supertest";
import chai from "chai";
import e from "express";

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing de la app AdopME", () => {
    describe("Testing de routes pets", () => {
        it("POST de la route pets tiene que crear una mascota", async () => {
            const mockDino ={
                name: "Dino",
                specie: "Salchicha",
                birthday: "2003-01-01"
            }

            const {statusCode, ok, _body} = await requester.post("api/pets").send(mockDino);

            expect(_body.payload).to.have.property("_id");
        })

        it("Se debe corroborar que la mascota no haya sido adoptada ya", async () => {
            const mockDino2 = {
                name: "Dino2",
                specie: "Michi",
                birthday: "2012-11-06"
            };
            const {statusCode, _body} = await requester.post("api/pets").send(mockDino2);

            expect(statusCode).to.equal(200);
            expect(_body.payload.adopted).to.equal(false);
        })

        it("Al obtener a las mascotas con el metodo GET, la respuesta debe tener los campos STATUS y PAYLOAD. Ademas, PAYLOAD debe ser de tipo arreglo", async () => {
          const {statusCode, _body}= await requester.get("api/pets"); 
        
          expect(statusCode).to.equal(200);
          expect(_body).to.have.property("payload").that.is.an("array");
        })

        it("el metodo delete debe poder eliminar la ultima mascota agregada", async () => {
            const newDinoPet = {
                name:"Nemo",
                specie:"Pez",
                birthday:"2003-01-01"
            };
            await requester.post("api/pets").send(newDinoPet);

            const {_body:{payload:{_id}}}= await requester.post("/api/pets").send(newDinoPet);

            const {statusCode} = await requester.delete(`/api/pets/${_id}`);

            expect(statusCode).to.equal(200);
        })
    })
    describe("Testin super mega pro", () => {
    let cookie;

        it("Deberia poder loguearse", async () => {
            const user = {
                fist_name: "Juli",
                last_name: "Perez",
                email: "juliperez@me.com",
                password: "1234"
            }
            const {_body} =await requester.post("/api/sessions/register").send(user);

            expect(_body.payload).to.be.ok;
        })

        it("Deberia poder loguearse y recuperar la cookie", async () => {

            const user = {
                email: "juliperez@me.com",
                password: "1234"
            }
            const resultado = await requester.post("/api/sessions/login").send(user);
            cookieresult = resultado.headers['set-cookie'][0];
            expect(cookie).to.be.ok;

            cookie={
                name  :cookieresult.split("=")[0],
                value:cookieresult.split("=")[1]
            }

            expect(cookie.name).to.be.ok.and.equal("coderCookie");
            expect(cookie.value).to.be.ok;
        })

        it("Debe enviar la cookie del user", async () => {
            const {_body} = await requester.get("/api/sessions/current").set("Cookie",[`${cookie.name}=${cookie.value}`]);
        
            expect(_body.payload.email).to.be.equal("juliperez@me.com");
        })
    })
})
