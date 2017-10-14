﻿using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Angular4.Core.DataLayer;

namespace Angular4.Web.Controllers.Api
{
    public class FileBlobsController : ApiController
    {
        private readonly Context _db = new Context();

        [HttpGet]
        public async Task<HttpResponseMessage> GetFileBlob(Guid id)
        {
            var fileBlob = await _db.FileBlobs.FindAsync(id);
            var result = Request.CreateResponse(HttpStatusCode.OK);
            result.Content = new StreamContent(new MemoryStream(fileBlob.File));
            result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = fileBlob.Name;

            return result;
        }

        [ResponseType(typeof(Guid))]
        public async Task<IHttpActionResult> PostFileBlob()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new Exception();

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);

            HttpContent content = provider.Contents.First();
            var fileName = content.Headers.ContentDisposition.FileName.Trim('\"');
            var buffer = await content.ReadAsByteArrayAsync();

            var fileBlob = new FileBlob()
            {
                Id = Guid.NewGuid(),
                Name = fileName,
                File = buffer
            };

            _db.FileBlobs.Add(fileBlob);
            await _db.SaveChangesAsync();

            return Ok(fileBlob.Id);
        }
    }
}
