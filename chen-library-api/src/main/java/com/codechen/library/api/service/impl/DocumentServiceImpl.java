package com.codechen.library.api.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.codechen.library.api.domain.entity.Document;
import com.codechen.library.api.mapper.DocumentMapper;
import com.codechen.library.api.service.IDocumentService;
import org.springframework.stereotype.Service;

/**
 * @author：Java陈序员
 * @date：2024-10-22 15:04
 * @description：文档 ServiceImpl
 */
@Service
public class DocumentServiceImpl extends ServiceImpl<DocumentMapper, Document> implements IDocumentService {
}
