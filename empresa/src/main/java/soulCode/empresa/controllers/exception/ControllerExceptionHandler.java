package soulCode.empresa.controllers.exception;

import javax.servlet.ServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import soulCode.empresa.services.exception.DataIntegrityViolationException;
import soulCode.empresa.services.exception.ObjectNotFoundException;

@ControllerAdvice
//Anotação aponta que a classe vai controlar os erros
public class ControllerExceptionHandler {
	
	@ExceptionHandler(ObjectNotFoundException.class)
	// A ResponseEntity traz a classe inteira, do tipo StandardError
	// Dentro do método objectNotFoundException são definidos dois parâmetros. Um é o "e" do tipo ObjectNotFoundException. 
	// O segundo parâmetro é uma request do tipo Servletrequest.
	public ResponseEntity<StandardError> objectNotFoundException(ObjectNotFoundException e, ServletRequest request){
		// Instanciamos um objeto error dentro da classe StandardError
		// O prieiro parâmetro instanciado na classe é o tempo em ms. O segundo é o status do http. O teceiro é a mensagem buscada no CargoService
		StandardError error = new StandardError(System.currentTimeMillis(), HttpStatus.NOT_FOUND.value(), e.getMessage());
		
		// retornamos o corpo(body) do status encontrado
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}
	
	// Tratamento de um segundo erro
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<StandardError> dataIntegrityViolationException(DataIntegrityViolationException e, ServletRequest request){
		StandardError error = new StandardError(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
	}
}