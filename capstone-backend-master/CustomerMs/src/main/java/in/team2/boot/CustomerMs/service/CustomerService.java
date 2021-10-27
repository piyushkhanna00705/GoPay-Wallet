package in.team2.boot.CustomerMs.service;

import in.team2.boot.CustomerMs.model.Customer;
import in.team2.boot.CustomerMs.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer saveCustomer(Customer customer){
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomer(){
        return customerRepository.findAll();
    }

    public Customer getCustomerById(int id){
        Optional<Customer> customer = customerRepository.findById(id);
        if(customer.isPresent()) return customer.get();
        return null;
    }

    public void deleteCustomerById(int id){
        customerRepository.deleteById(id);
    }
    public void deleteAllCustomer(){
        customerRepository.deleteAll();
    }

    public Customer getCustomerByEmail(String email){
        return customerRepository.findByEmail(email);
    }
}
