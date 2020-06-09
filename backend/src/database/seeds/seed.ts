import Knex from 'knex'

export async function seed(knex:Knex){
 await knex('items').insert([
      {
          title:'lanpadas',
          image:'lanpada.svg'
      },
      { 
          title: 'pilhas e baterias',
           image: 'bateria.svg' 
     },
      {
         title: 'papeis e papelao',
         image: 'papeis-papelao.svg'
     },
      { title: 'residuos eletronicos',
        image: 'eletronicos.svg'
     },
      { title: 'residuos organicos',
          image: 'organico.svg'
     },
      { title: 'oleo de cuzinha',
          image: 'oleo.svg'
     },

  ])
}