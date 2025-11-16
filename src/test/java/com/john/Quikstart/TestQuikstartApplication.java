package com.john.Quikstart;

import org.springframework.boot.SpringApplication;

public class TestQuikstartApplication {

	public static void main(String[] args) {
		SpringApplication.from(QuikstartApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
