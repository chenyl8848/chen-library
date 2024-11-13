package com.codechen.library.api.controller;

import com.codechen.library.api.domain.entity.Document;
import com.codechen.library.api.service.IDocumentService;
import com.codechen.library.framework.domain.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author：Java陈序员
 * @date：2024-10-22 15:13
 * @description：文档 Controller
 */
@RestController
@RequestMapping("/document")
@Api(value = "文档", tags = "文档接口")
public class DocumentController {

    @Autowired
    private IDocumentService documentService;

//    @GetMapping("/{id}")
//    @ApiOperation(value = "根据ID获取文档信息")
//    public Result<UserInfo> getDocumentById(@PathVariable("id") Long id) {
////        Document document = documentService.getById(id);
//
//        UserInfo userInfo = UserInfoHolder.getUserInfo();
//        return Result.success(userInfo);
//    }

    @GetMapping("/{id}")
    @ApiOperation(value = "根据ID获取文档")
    public Result<Document> getById(@PathVariable Long id) {
        Document document = documentService.getById(id);
        return Result.success(document);
    }

    @GetMapping("/")
    @ApiOperation(value = "获取全部文档")
    public Result<List<Document>> getList() {
        List<Document> list = documentService.list();
        return Result.success(list);
    }

    @PostMapping("/")
    @ApiOperation(value = "新增文档")
    public Result<Boolean> add(@RequestBody Document document) {
        boolean save = documentService.save(document);
        return Result.success(save);
    }

    @PutMapping("/")
    @ApiOperation(value = "修改文档")
    public Result<Boolean> update(@RequestBody Document document) {
        Document documentById = documentService.getById(document.getId());
        if (documentById == null) {
            return Result.fail("数据不存在！");
        }

        boolean update = documentService.updateById(document);
        return Result.success(update);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "删除文档")
    public Result<Boolean> delete(@PathVariable Long id) {
        boolean remove = documentService.removeById(id);
        return Result.success(remove);
    }

}
