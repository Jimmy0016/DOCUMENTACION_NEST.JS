import { Controller,Get,HttpStatus,Param,Res,Post,Put,Body,Delete,HttpCode,Query,ParseIntPipe} from '@nestjs/common';
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
       @Post()
          @HttpCode(HttpStatus.NO_CONTENT)
          createProduct(
            @Body() body,
          ) {
            this.customersService.insert(body);
          }
           
    @Get()
    getHelloInCustomers(): string {
      return "Estamos en productos!!!";
    }
    @Get('gente')
  getSpecialCustomers(): string {
    return "te vamos a mostrar cosas";
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
              @Get('query')
              rutaQuery(@Query() query) {
                  return `El dato query.x ha recibido el valor ${query.x}`;
              }
              @Get('cars')
              carsQuery(@Query('count', ParseIntPipe) carCount: number) {
                return carCount;
              }
              @Get('ruta-error-404')
              @HttpCode(HttpStatus.NOT_FOUND)
               rutaConError404() {
               return 'Esto es un error 404!';
               }


  
    @Get(':id')
    fin(@Res() response, @Param('id') id: number) {
      if(id < 100) {
        return response.status(HttpStatus.OK).send(`Página del producto ${id}`);
      } else {
        return response.status(HttpStatus.NOT_FOUND).send(`Producto inexistente`);
      }
    }
}
