# Gavsplained

B.A Example Project of Node/Express/Apollo/Postgresql/Typescript/Typegraphql/Mikro-Orm/Dribbly/Brain/Words/have/lost/all/meaning

This readme notes just a few things that would have been helpful to know the first time.
# Installation

- [ ] PostgreSQL Database
    ``` 
    sudo apt install postgresql
    sudo -u postgres createuser -s $(whoami); createdb $(whoami)
    createdb gavsplain
    ```
    ctl postgresql.service
    db user: gavin/devpass

    https://zvado.herokuapp.com/blog/details/sRgvE97vGjGL8uM6WQrI

    - [ ] Enter postgres IE with `psql` and run `\password`
    - Alternative fixes involve changing the method in pg_hba.conf
    - `ALTER ROLE gavin WITH SUPERUSER;`


- [ ] Migrations 
      - `npx mikro-orm migration:create --initial`
      - `npx mikro-orm migration:up`
      
      Ran into a bug here where the example code automatically 
      typecast two date fields to json, and threw a DriverError
      on incorrect types. Migrations also went poorly because 
      jsonb was not castable to date in the migration. 

      I could also have written the table drop into a fresh migration file.

      Or 
      ```
      npx mikro-orm migration:fresh    # Drop the database and migrate up to the latest
      ```


## Notes

types-graphql and graphql are different packages with similarly named functions

localhost:4000/graphql : graphql playground