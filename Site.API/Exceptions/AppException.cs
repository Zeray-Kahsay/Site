namespace Site.API.Exceptions;

public abstract class AppException : Exception
{
  public int StatusCode { get; }

  protected AppException(string message, int statusCode) : base(message)
  {
    StatusCode = statusCode;
  }
}

public class ConflictException : AppException
{
  public ConflictException(string message) : base(message, 409) { }
}

public class NotFoundException : AppException
{
  public NotFoundException(string message) : base(message, 404) { }
}

public class UnauthorizedException : AppException
{
  public UnauthorizedException(string message) : base(message, 401) { }
}

public class ForbiddenException : AppException
{
  public ForbiddenException(string message) : base(message, 403) { }
}

public class ValidationException : AppException
{
  public ValidationException(string message) : base(message, 400) { }
}

public class PaymentRequiredException : AppException
{
  public PaymentRequiredException(string message) : base(message, 402) { }
}

public class BadRequestException : AppException
{
  public BadRequestException(string message) : base(message, 400) { }
}

public class InternalServerException : AppException
{
  public InternalServerException(string message) : base(message, 500) { }
}
