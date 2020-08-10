using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageTaks.Models
{
    public class Image
    {
        public string Id { get; set; }

        public string FileName { get; set; }

        public byte[] Picture { get; set; }

    }
}
