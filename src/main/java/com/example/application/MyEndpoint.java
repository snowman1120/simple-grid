package com.example.application;

import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

@Endpoint
@AnonymousAllowed
public class MyEndpoint {

    @Autowired
    PersonRepository repository;

    public List<Person> list(Pageable pageable) {
        return repository.findAll(pageable).getContent();
    }

}
