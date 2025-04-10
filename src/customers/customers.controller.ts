import { Controller,Get,HttpStatus,Param,Res,Put,Body,Delete,HttpCode} from '@nestjs/common';
import { Customer } from './interface/customer/customer.interface';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }
      @Get()
      getAllProducts(): Customer[] {
        return this.customersService.getCust();
      }
    
      @Get(':id')
      find(@Param('id') id: number) {
        return this.customersService.getId(id);
      }
       @Put(':id')
          update(
            @Param('id') id: number, 
            @Body() body,
          ) {
            return this.customersService.update(id, body);
          }
          @Delete(':id')
              @HttpCode(HttpStatus.NO_CONTENT)
              delete(@Param('id') id: number) {
                this.customersService.delete(id);
              }


  
    // @Get(':id')
    // find(@Res() response, @Param('id') id: number) {
    //   if(id < 100) {
    //     return response.status(HttpStatus.OK).send(`Página del producto ${id}`);
    //   } else {
    //     return response.status(HttpStatus.NOT_FOUND).send(`Producto inexistente`);
    //   }
    // }
}
