using System.Runtime.Serialization;

namespace App.Exceptions
{
    [Serializable]
    internal class BadRequestException : Exception
    {
        public BadRequestException()
        {
        }

        public BadRequestException(string message) : base(message)
        {
        }

        public BadRequestException(string message, Exception innerException) : base(message, innerException)
        {
        }

    }
}