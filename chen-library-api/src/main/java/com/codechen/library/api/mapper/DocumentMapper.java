package com.codechen.library.api.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.codechen.library.api.domain.entity.Document;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author：Java陈序员
 * @date：2024-10-22 15:03
 * @description：文档 Mapper
 */
@Mapper
public interface DocumentMapper extends BaseMapper<Document> {
}
