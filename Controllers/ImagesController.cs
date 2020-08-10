using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using ImageTaks.Models;

namespace ImageTaks.Controllers
{
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private static List<Image> ImageList = new List<Image>();

        [Route("api/Images")]
        [HttpGet]
        public IEnumerable<Image> Get(string guid = "")
        {
            if (string.IsNullOrEmpty(guid))            
                return ImageList;
            else
            {
                return ImageList.Where(i => i.Id == guid).ToList();
            }
        }
        [Route("api/UploadImage")]
        [HttpGet]
        public IEnumerable<string> Upload(string itemName = "")
        {
           // ImageList.Add(itemName);
            return new List<string> { "success" };
        }

        [Route("api/getImage")]
        [HttpGet]
        public IActionResult GetImage(string imageName)
        {

            //Byte[] b = System.IO.File.ReadAllBytes(@"E:\\Test.jpg");   // You can use your own method over here.         
            var b = ImageList.Where(i => i.FileName == imageName).FirstOrDefault()?.Picture;
            if (b != null)
            {
                return File(b, "image/jpeg");
            }
            else
            {
                return null;
            }
        }

        [Route("api/createimage")]
        [HttpPost]
        public bool createimage([FromForm] ImageDTO img)
        {
            try
            {
                Image image = new Image { FileName = img.FileName, Id = img.Guid };
                byte[] imageData = null;
                using (var binaryReader = new BinaryReader(img.Image.OpenReadStream()))
                {
                    imageData = binaryReader.ReadBytes((int)img.Image.Length);
                }
                image.Picture = imageData;
                ImageList.Add(image);
                return true;
            }
            catch(Exception ex)
            {
                //log exception
                return false;
            }
        }
    }
}
