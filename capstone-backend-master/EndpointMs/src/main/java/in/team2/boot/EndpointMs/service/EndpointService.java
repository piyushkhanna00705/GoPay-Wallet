package in.team2.boot.EndpointMs.service;

import in.team2.boot.EndpointMs.model.Endpoint;
import in.team2.boot.EndpointMs.repository.EndpointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EndpointService {
    @Autowired
    private EndpointRepository endpointRepository;

    public Endpoint saveEndpoint(Endpoint endpoint){
        return endpointRepository.save(endpoint);
    }
    public Endpoint saveOrUpdate(Endpoint endpoint){
        return endpointRepository.save(endpoint);
    }
    public List<Endpoint> getAllEndpoint(){
        return endpointRepository.findAll();
    }

    public Endpoint getEndpointById(int id){
        Optional<Endpoint> endpoint = endpointRepository.findById(id);
        if(endpoint.isPresent()) return endpoint.get();
        return null;
    }

    public List<Endpoint> getEndpointByCountry(String country){
        return endpointRepository.findByCountry(country);
    }

    public List<Endpoint> getEndpointByCurrency(String currency){
        return endpointRepository.findByCurrency(currency);
    }


}
