const URL = "127.0.0.1:5500";
const NUMERO_CUADROS = 12;

context("Memotest",()=>{

    before(()=>{
        cy.visit(URL);
    })

    describe('juega al memotest', () => { 
        it("revisamos que haya 12 cuadros en la tabla",()=>{
            cy.get(".cuerpo").find(".cuadro").should("have.length", NUMERO_CUADROS);
        });

        it("aseguramos que los cuadros sean aleatorios",()=>{
            cy.get(".cuadro").then((cuadros)=>{
                let clasesOriginales = [];
                cuadros.each((index, cuadro)=>{
                    clasesOriginales.push(cuadro.className);
                });
                
                cy.visit(URL);

                let clasesNuevas = [];
                cy.get(".cuadro").then((nuevosCuadros)=>{
                    nuevosCuadros.each((index, cuadro)=>{
                        clasesNuevas.push(cuadro.className);
                    });
                    cy.wrap(clasesOriginales).should("to.deep.equal", clasesNuevas); //ahora usamos to.deep.equal por que ya no existe not.deep.equal
                });
            });
        });
        //seguir en 1:30, 
    });

});