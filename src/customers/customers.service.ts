import { Injectable } from '@nestjs/common';
import { Customer } from './interface/customer/customer.interface';
import { NotFoundException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
@Injectable()
export class CustomersService  { 
    private custmon: Customer[] = [
    {
        id: 1,
        name: 'Juan',
        age: 20,
        birthday: new Date('2005/4/24'),
      },
      {
        id: 2,
        name: 'Mario',
        age: 19,
        birthday: new Date('2006/4/8'),
      },];
      
 getCust():Customer [] {
  return this.custmon;
 }
            
getId(id: number): Customer | undefined {
 const customer = this.custmon.find( (item: Customer) => item.id == id);
           if(customer) {
             return customer;
           } else {
             throw new NotFoundException(`No encontramos el producto ${id}`);
           }
          }

 update(id: number, body: any) {
           let CUSTOMER: Customer = {
             id,
             name: body.name,
             birthday: body.birthday,
             age: body.age
           }
           this.custmon = this.custmon.map( (item: Customer) => {
             console.log(item, id, item.id == id);
             return item.id == id ? CUSTOMER : item;
           });
         }
         delete(id: number) {
                   const customer = this.custmon.find((item: Customer) => item.id == id);
                             if(customer) {
                               this.custmon = this.custmon.filter( (item: Customer) => item.id != id );
                             } else {
                               throw new HttpException(`No existe el producto ${id}`, HttpStatus.NOT_FOUND);
                             }
                 }
                 private lastId(): number {
                    return this.custmon[this.custmon.length - 1].id;
                  }
                  insert(body: any) {
                    this.custmon = [
                      ...this.custmon,
                      {
                        id: this.lastId() + 1,
                        name: body.name,
                        birthday: body.birthday,
                        age: body.age
                      }
                    ];
                  }
    
}
