'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'src',
    function () {
        describe(
            'controllers',
            function () {
                describe(
                    'error',
                    function () {
                        describe(
                            'index',
                            function () {
                                let expect;
                                let index;
                                let errorHandlerStub;
                                let notFoundStub;

                                before(function () {
                                    expect = chai.expect;
                                    chai.use(sinonChai);
                                });

                                beforeEach(function () {
                                    errorHandlerStub = sinon.stub()
                                        .returns('errorHandlerStub');
                                    notFoundStub = sinon.stub()
                                        .returns('notFoundStub');

                                    index = proxyquire(
                                        '../../../../src/controllers/error',
                                        {
                                            './error-handler': errorHandlerStub,
                                            './not-found': notFoundStub
                                        }
                                    );
                                });

                                afterEach(function () {
                                    sinon.reset();
                                    sinon.restore();
                                });

                                it(
                                    'should export 2 files',
                                    function () {
                                        const EXPORTED_FILES_COUNT = 2;

                                        expect(Object.keys(index).length)
                                            .to
                                            .be
                                            .equal(EXPORTED_FILES_COUNT);
                                    }
                                );

                                it(
                                    'should export errorHandler',
                                    function () {
                                        expect(index.errorHandler())
                                            .to
                                            .be
                                            .equal('errorHandlerStub');
                                    }
                                );

                                it(
                                    'should export notFound',
                                    function () {
                                        expect(index.notFound())
                                            .to
                                            .be
                                            .equal('notFoundStub');
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);
