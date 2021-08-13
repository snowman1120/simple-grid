package com.example.application;

import java.time.LocalDateTime;

import com.vaadin.flow.spring.annotation.SpringComponent;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.vaadin.artur.exampledata.DataType;
import org.vaadin.artur.exampledata.ExampleDataGenerator;

@SpringComponent
public class DemoDataGenerator {

    @Bean
    public CommandLineRunner loadData(PersonRepository samplePersonRepository) {
        return args -> {
            int seed = 123;
            LocalDateTime dateTimeSeed = LocalDateTime.of(2021, 8, 12, 0, 0, 0);
            ExampleDataGenerator<Person> samplePersonRepositoryGenerator = new ExampleDataGenerator<>(Person.class,
                    dateTimeSeed);
            samplePersonRepositoryGenerator.setData(Person::setId, DataType.UUID);
            samplePersonRepositoryGenerator.setData(Person::setName, DataType.FULL_NAME);
            samplePersonRepositoryGenerator.setData(Person::setDateOfBirth, DataType.DATE_OF_BIRTH);
            samplePersonRepositoryGenerator.setData(Person::setOccupation, DataType.OCCUPATION);
            samplePersonRepository.saveAll(samplePersonRepositoryGenerator.create(500, seed));
        };
    }

}