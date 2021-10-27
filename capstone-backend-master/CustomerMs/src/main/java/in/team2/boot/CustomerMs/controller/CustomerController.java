package in.team2.boot.CustomerMs.controller;

import in.team2.boot.CustomerMs.model.Customer;
import in.team2.boot.CustomerMs.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:4200")

public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public Customer saveCustomer(@RequestBody Customer customer){
        customer.setCreatedAt(LocalDate.now());
        return customerService.saveCustomer(customer);
    }

    @PutMapping
    public Customer updateCustomer(@RequestBody Customer customer){
        return customerService.saveCustomer(customer);
    }

    @GetMapping
    public List<Customer> getAllCustomer(){
        return customerService.getAllCustomer();
    }

    @GetMapping("/{customerId}")
    public Customer getCustomerById(@PathVariable int customerId){
        return customerService.getCustomerById(customerId);
    }

    @DeleteMapping("/all")
    public void deleteAllCust(){
        customerService.deleteAllCustomer();
    }
    @DeleteMapping("/{id}")
    public void deleteCustById(@PathVariable int id){
        customerService.deleteCustomerById(id);
    }

    @GetMapping("/email/{email}")
    public Customer getCustomerByEmail(@PathVariable String email){
        return customerService.getCustomerByEmail(email);
    }
}