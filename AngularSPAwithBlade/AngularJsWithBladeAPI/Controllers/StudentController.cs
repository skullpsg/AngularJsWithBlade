using AngularJsWithBladeDAL.UnitOfWork;
using AngularJsWithBladeModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace SimpleBlogWebApi.Controllers
{
    public class StudentController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public StudentController()
        {
            _unitOfWork = new UnitOfWork();
        }

        [HttpGet]
        [Route("api/Students")]
        public async Task<List<Student>> GetStudentList()
        {
            return await _unitOfWork.StudentRepository.GetStudentList();
        }

        [HttpGet]
        [Route("api/Student/Details/{id}")]
        public async Task<Student> GetStudentById(Guid id)
        {
            return await _unitOfWork.StudentRepository.GetStudentById(id);
        }

        [HttpPost]
        [Route("api/Students/Add")]
        public async Task<bool> CreateStudent(Student student)
        {
            _unitOfWork.StudentRepository.AddStudent(student);
            return await _unitOfWork.SaveChangesAsync();
        }

        [HttpPost]
        [Route("api/Students/Update")]
        public async Task<bool> UpdateStudent(Student student)
        {
            _unitOfWork.StudentRepository.UpdateStudent(student);
            return await _unitOfWork.SaveChangesAsync();
        }

        [HttpGet]
        [Route("api/Students/Delete/{id}")]
        public async Task<bool> DeleteStudentById(Guid id)
        {
            _unitOfWork.StudentRepository.DeleteStudentById(id);
            return await _unitOfWork.SaveChangesAsync();
        }
    }
}