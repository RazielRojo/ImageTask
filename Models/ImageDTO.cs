using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageTaks.Models
{
    public class ImageDTO
    {
        public string FileName { get; set; }

        public IFormFile Image { get; set; }

        public string Guid { get; set; }
    }
}
