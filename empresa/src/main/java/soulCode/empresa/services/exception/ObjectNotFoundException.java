package soulCode.empresa.services.exception;

//É obrigatório fazer a extensão para o tratamento de erro funcionar
public class ObjectNotFoundException extends RuntimeException {


	public ObjectNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public ObjectNotFoundException(String message) {
		super(message);
	
	}
	
	// Trata a versão da aplicação
	private static final long serialVersionUID = 1L;
}
