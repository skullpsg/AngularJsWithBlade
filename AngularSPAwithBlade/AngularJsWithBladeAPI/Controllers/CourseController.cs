using AngularJsWithBladeDAL.UnitOfWork;
using AngularJsWithBladeModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SimpleBlogWebApi.Controllers
{
    public class CourseController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public CourseController()
        {
            _unitOfWork = new UnitOfWork();
        }

        [HttpGet]
        [Route("api/Courses")]
        public async Task<List<Course>> GetCourseList()
        {
            return await _unitOfWork.CourseRepository.GetCourseList();
        }

        [HttpGet]
        [Route("api/Courses/Universities/{Id}")]
        public async Task<List<Course>> GetCourseListByUniversityId(Guid id)
        {
            return await _unitOfWork.CourseRepository.GetCourseListByUniversityId(id);
        }

        [HttpPost]
        [Route("api/Courses/Add")]
        public async Task<bool> CreateCourse(Course _course)
        {
            _unitOfWork.CourseRepository.AddCourse(_course);
            return await _unitOfWork.SaveChangesAsync();
        }

        [HttpPost]
        [Route("api/Courses/Update")]
        public async Task<bool> UpdateCourse(Course _course)
        {
            _unitOfWork.CourseRepository.UpdateCourse(_course);
            return await _unitOfWork.SaveChangesAsync();
        }

        [HttpGet]
        [Route("api/Course/Details/{id}")]
        public async Task<Course> GetCourseDetailsById(Guid id)
        {
            return await _unitOfWork.CourseRepository.GetCourseById(id);
        }

        [HttpGet]
        [Route("api/Courses/Delete/{id}")]
        public async Task<bool> DeleteCourseById(Guid id)
        {
            _unitOfWork.StudentRepository.DeleteStudentsByCourseId(id);
            _unitOfWork.CourseRepository.DeleteCourseById(id);
            return await _unitOfWork.SaveChangesAsync();
        }
    }
}