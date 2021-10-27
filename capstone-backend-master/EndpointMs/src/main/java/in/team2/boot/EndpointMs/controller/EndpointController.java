package in.team2.boot.EndpointMs.controller;

import in.team2.boot.EndpointMs.model.Endpoint;
import in.team2.boot.EndpointMs.service.EndpointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/endpoint")
@CrossOrigin(origins = "http://localhost:4200")
public class EndpointController {

    @Autowired
    private EndpointService endpointService;

    @PostMapping
    public Endpoint saveEndpoint(@RequestBody Endpoint endpoint){
        return endpointService.saveEndpoint(endpoint);
    }
    @PutMapping
    public Endpoint updateEndpoint(@RequestBody Endpoint endpoint){
        return endpointService.saveOrUpdate(endpoint);
    }

    @GetMapping
    public List<Endpoint> getAllEndpoint(){
        return endpointService.getAllEndpoint();
    }

    @GetMapping("/{endpointId}")
    public Endpoint getEndpointById(@PathVariable int endpointId){
        return endpointService.getEndpointById(endpointId);
    }

    @GetMapping("/country/{country}")
    public List<Endpoint> getEndpointByCountry(@PathVariable String country){
        return endpointService.getEndpointByCountry(country);
    }

    @GetMapping("/currency/{currency}")
    public List<Endpoint> getEndpointByCurrency(@PathVariable String currency){
        return endpointService.getEndpointByCurrency(currency);
    }



}
