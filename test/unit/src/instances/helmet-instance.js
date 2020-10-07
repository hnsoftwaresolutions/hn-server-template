'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'src',
    function () {
        describe(
            'instances',
            function () {
                describe(
                    'helmet-instance',
                    function () {
                        let expect;
                        let helmetInstance;
                        let helmetStub;

                        before(function () {
                            expect = chai.expect;
                            chai.use(sinonChai);
                        });

                        beforeEach(function () {
                            helmetStub = sinon.stub()
                                .returns('helmetStub');

                            helmetInstance = proxyquire(
                                '../../../../src/instances/helmet-instance.js',
                                {
                                    helmet: helmetStub
                                }
                            );
                        });

                        afterEach(function () {
                            sinon.restore();
                            sinon.reset();
                        });

                        it(
                            'should call helmet once with no parameters',
                            function () {
                                expect(helmetStub)
                                    .to
                                    .have
                                    .been
                                    .calledOnceWithExactly();
                            }
                        );

                        it(
                            'should export correct data',
                            function () {
                                expect(helmetInstance)
                                    .to
                                    .equal('helmetStub');
                            }
                        );
                    }
                );
            }
        );
    }
);
